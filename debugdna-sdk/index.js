const axios = require("axios")

class DebugDNA {

  static init(config) {

    const {
      apiUrl,
      projectId,
      appName,
      environment,
      apiKey,
    } = config

    process.on(
      "uncaughtException",
      async (error) => {

        try {

          await axios.post(
            `${apiUrl}/api/ingest`,
            {
              projectId,
              appName,
              environment,
              severity: "HIGH",
              logs: error.stack,
            },
            {
                headers: {
                  "x-api-key": apiKey
                },
            }
          )

          console.log(
            "DebugDNA captured an application crash."
          )

        } catch (err) {

  console.log(
    "DebugDNA failed to send logs."
  )

  console.log(
    err.response?.status
  )

  console.log(
    err.response?.data
  )

  console.log(
    err.message
  )
}
      }
    )

    process.on(
      "unhandledRejection",
      async (reason) => {

        try {

          await axios.post(
            `${apiUrl}/api/ingest`,
            {
              projectId,
              appName,
              environment,
              severity: "HIGH",
              logs: reason.toString(),
            },
            {
                headers: {
                  "x-api-key": apiKey
                },
            }
          )

          console.log(
            "DebugDNA captured a rejected promise."
          )

        } catch (err) {

          console.log(
            "DebugDNA failed to send logs."
          )
        }
      }
    )

    console.log(
      "DebugDNA monitoring initialized."
    )
  }
}

module.exports = DebugDNA