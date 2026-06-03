import { useState } from "react";
import axios from "axios";

function App() {

  const [url, setUrl] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);



  const generate = async () => {

    try {

      setLoading(true);
      setResult(null);

      const response =
        await axios.post(
  "http://localhost:5000/api/generate",
          {
            githubUrl: url
          }
        );

      setResult(response.data);

    }
    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        "Something went wrong"
      );
    }
    finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <h1>DockerForge</h1>

      <input
        type="text"
        placeholder="GitHub Repository URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        style={{
          width: "600px",
          padding: "10px"
        }}
      />

      <button
        onClick={generate}
        style={{
          marginLeft: "10px",
          padding: "10px 20px"
        }}
      >
        Generate
      </button>

      {loading && (
        <h3>
          Processing...
        </h3>
      )}

      {result && (

        <div>

          <hr />

          <h2>
            Dockerfile
          </h2>

          <pre
            style={{
              background: "#eee",
              padding: "20px"
            }}
          >
            {result.dockerfile}
          </pre>

          <h2>
            Build Status
          </h2>

          <p>
            {
              result.buildResult.success
                ? "✅ Success"
                : "❌ Failed"
            }
          </p>

          <h2>
            Build Logs
          </h2>

          <textarea
            rows="20"
            cols="120"
            value={
              result.buildResult.logs
            }
            readOnly
          />

          {
            result.runResult &&
            (
              <>
                <h2>
                  Container Status
                </h2>

                <p>
                  ✅ Running
                </p>

                <p>
                  Container ID:
                </p>

                <pre>
                  {
                    result.runResult
                      .containerId
                  }
                </pre>
              </>
            )
          }

        </div>

      )}{
  result && (
    <>
      <h2>Health Check</h2>

      <p>
        {
          result.healthResult?.healthy
            ? "✅ Container Healthy"
            : "❌ Container Not Running"
        }
      </p>

      <h2>Build Attempts</h2>

      <p>
        {
          result.buildResult?.attempts || 1
        }
      </p>
    </>
  )
}
    </div>
  );
}

export default App;