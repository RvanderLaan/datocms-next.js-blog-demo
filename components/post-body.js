import { StructuredText, Image } from "react-datocms";

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "ImageBlockRecord") {
              return <Image data={record.image.responsiveImage} />;
            }
            if (record.__typename === "BespaarcheckRecord") {
              return (
                <div>
                  <h1>Welkom in de Bespaarcheck!</h1>
                  <form>
                    <label>
                      Postcode: <input placeholder="1234AB" />
                    </label>
                    <br />
                    <label>
                      Huisnummer: <input placeholder="1" />
                    </label>
                    <br />
                    <label>
                      Toevoeging: <input placeholder="a" />
                    </label>
                    <br />
                    <button onClick={() => alert("Volgende!")}>Volgende</button>
                  </form>
                </div>
              );
            }

            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
