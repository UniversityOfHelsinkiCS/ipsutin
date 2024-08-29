import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'

import llmRouter from '../src/server/routes/llm'

const app = express()
app.use(bodyParser.json())
app.use('/api', llmRouter)

describe('LLM API Tests', () => {
  beforeAll(async () => {})

  it('POST /validation should respond with validation feedback', async () => {
    const response = await request(app)
      .post('/api/validation')
      .send({ userInput: 'Test input', validationStep: 1 })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('content')
  })

  it('POST /step1 should respond with streamed events', async () => {
    const response = await request(app).post('/api/step1').send({
      inventiveMessage: 'Inventive message',
      industrialMessage: 'Industrial message',
      publicMessage: 'Public message',
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/event-stream')
  }, 15000)

  it('POST /step2 should respond with streamed events', async () => {
    const response = await request(app)
      .post('/api/step2')
      .send({ aiResponse1: 'Response 1', messages: [] })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/event-stream')
  }, 15000)

  it('POST /step3 should respond with streamed events', async () => {
    const response = await request(app).post('/api/step3').send({
      aiResponse1: 'Response 1',
      aiResponse2: 'Response 2',
      messages: [],
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/event-stream')
  }, 15000)

  it('POST /step4 should respond with streamed events', async () => {
    const response = await request(app).post('/api/step4').send({
      aiResponse1: 'Response 1',
      aiResponse2: 'Response 2',
      aiResponse3: 'Response 3',
      messages: [],
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/event-stream')
  }, 15000)
})

describe('LLM API Tests - Error Handling', () => {
  it('POST /validation should handle errors', async () => {
    const response = await request(app).post('/api/validation').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  })
  it('POST /step1 should handle errors when required fields are missing', async () => {
    const response = await request(app).post('/api/step1').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  }, 15000)

  it('POST /step2 should handle errors when required fields are missing', async () => {
    const response = await request(app).post('/api/step2').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  }, 15000)

  it('POST /step3 should handle errors when required fields are missing', async () => {
    const response = await request(app).post('/api/step3').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  }, 15000)

  it('POST /step4 should handle errors when required fields are missing', async () => {
    const response = await request(app).post('/api/step4').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  }, 15000)
})
