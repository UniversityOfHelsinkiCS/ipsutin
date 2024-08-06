const processStream = async (
  stream: ReadableStream,
  setAiResponse: React.Dispatch<React.SetStateAction<string>>
) => {
  const reader = stream.getReader()
  const decoder = new TextDecoder()

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read()
      if (done) break

      const text = decoder.decode(value)
      setAiResponse((prev) => prev + text)
    }
  } catch (err) {
    throw new Error('Error while reading stream:')
  } finally {
    reader.releaseLock()
  }
}

export default processStream
