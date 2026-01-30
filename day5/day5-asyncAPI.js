// Fake async API that randomly succeeds or fails
function fakeApi() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;

    setTimeout(() => {
      if (success) {
        resolve("✅ Data fetched successfully");
      } else {
        reject(new Error("❌ API request failed"));
      }
    }, 1000);
  });
}

/*
--------------------------------------------------
Handled Error Case using try/catch
--------------------------------------------------
*/
async function handledRequest() {
  try {
    const result = await fakeApi();
    console.log("Handled Result:", result);
  } catch (error) {
    console.error("Handled Error:", error.message);
  }
}

/*
--------------------------------------------------
UNHANDLED Rejection Case
--------------------------------------------------
This function does NOT handle errors.
If fakeApi rejects, it will cause:
- UnhandledPromiseRejection warning
- Process crash in future Node versions
--------------------------------------------------
*/
async function unhandledRequest() {
  const result = await fakeApi(); // no try/catch
  console.log("Unhandled Result:", result);
}

// Run examples
handledRequest(); // handles error 
unhandledRequest();// does not handles error
