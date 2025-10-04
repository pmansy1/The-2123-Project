# OpenAI API Setup Guide

This guide will help you set up OpenAI API access for AI image generation in The 2123 Project.

## Prerequisites

- OpenAI account with API access
- Credit on your OpenAI account (DALL-E usage is paid)

## Step 1: Get Your OpenAI API Key

1. **Sign up/Login**: Go to [OpenAI Platform](https://platform.openai.com/)
2. **Navigate to API Keys**: Click on your profile → "API Keys"
3. **Create New Key**: Click "Create new secret key"
4. **Copy the Key**: Save it securely (you won't be able to see it again)

## Step 2: Set Up Environment Variable

### Option A: Environment Variable (Recommended)

```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc, etc.)
export OPENAI_API_KEY="your-api-key-here"

# Or set it for the current session
export OPENAI_API_KEY="sk-your-actual-api-key"
```

### Option B: Application Properties (Not Recommended for Production)

Edit `src/main/resources/application.properties`:

```properties
spring.ai.openai.api-key=sk-your-actual-api-key
```

## Step 3: Test the Setup

1. **Start the backend server**:

   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Test image generation**:

   ```bash
   curl -X POST http://localhost:8080/api/cards/generate \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Vision",
       "description": "A futuristic classroom with holographic displays",
       "submittedBy": "Test User",
       "category": "WORK"
     }'
   ```

3. **Check the response**: You should see a card with an AI-generated image URL

## Step 4: Generate Images for Existing Cards

To generate AI images for all existing cards in the database:

```bash
curl -X POST http://localhost:8080/api/cards/generate-images
```

## Configuration Options

The following settings are configured in `application.properties`:

```properties
# OpenAI Settings for Image Generation
spring.ai.openai.api-key=${OPENAI_API_KEY:your-openai-api-key-here}
spring.ai.openai.image.model=dall-e-3
spring.ai.openai.image.size=1024x1024
spring.ai.openai.image.quality=standard
spring.ai.openai.image.n=1
```

### Available Options:

- **Model**: `dall-e-3` (latest), `dall-e-2` (older)
- **Size**: `1024x1024`, `1792x1024`, `1024x1792`
- **Quality**: `standard`, `hd` (higher quality, more expensive)
- **Number**: `1` (number of images to generate)

## Pricing Information

- **DALL-E 3**: $0.040 per image (1024x1024, standard quality)
- **DALL-E 3 HD**: $0.080 per image (1024x1024, HD quality)
- **DALL-E 2**: $0.020 per image (1024x1024)

## Troubleshooting

### Common Issues:

1. **"Invalid API Key"**: Check that your API key is correct and has credits
2. **"Rate Limit Exceeded"**: Wait a moment and try again
3. **"Insufficient Credits"**: Add credits to your OpenAI account
4. **"Content Policy Violation"**: The prompt may contain restricted content

### Debug Mode:

Enable debug logging to see detailed error messages:

```properties
logging.level.edu.trincoll.project2123.service.AIImageGenerationService=DEBUG
```

## Security Notes

- **Never commit API keys to version control**
- **Use environment variables in production**
- **Monitor your API usage and costs**
- **Set up billing alerts on OpenAI**

## Next Steps

Once set up, the application will:

1. Generate AI images for new user submissions
2. Allow batch generation for existing cards
3. Provide fallback to placeholder images if generation fails

The generated images will be displayed in the Virtual Gallery with full lightbox functionality.
