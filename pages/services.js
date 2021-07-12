import Head from "next/head";
import {
  renderMetaTags,
  StructuredText,
  useQuerySubscription,
} from "react-datocms";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      query($locale: SiteLocale!) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        requestpage(locale:$locale) {
          id
          testtext {
            value
          }
          _status
          _firstPublishedAt
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
        }
      }

      ${metaTagsFragment}
    `,
    variables: {
      // TODO: change this for EN page
      locale: "nl_NL",
    },
    preview,
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Index({ subscription }) {
  const {
    data: { site, requestpage },
    error,
    loading,
  } = useQuerySubscription(subscription);
  console.log(error, loading, requestpage);

  const metaTags = requestpage?.seo?.concat(site.favicon) || [];

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(metaTags)}</Head>
        <Container>
          <div>
            <a href="/">Home</a>
          </div>
          <StructuredText
            data={requestpage?.testtext || error?.toString() || ""}
          />
        </Container>
      </Layout>
    </>
  );
}
