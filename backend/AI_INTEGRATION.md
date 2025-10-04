# AI Image Generation Integration - The 2123 Project

This document explains how to set up and use the AI image generation features in The 2123 Project backend.

## 🤖 Overview

The AI integration uses OpenAI's DALL-E 3 API through Spring AI to automatically generate images for user-submitted futuristic visions. When users submit their ideas through the frontend, the system:

1. **Receives** the user's vision text
2. **Enhances** the prompt with Trinity College context and category-specific elements
3. **Generates** a unique image using DALL-E 3
4. **Saves** the card with the generated image to the database
5. **Returns** the complete card data to the frontend

## 🔧 Setup Instructions

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### 2. Configure Environment Variables

**Option A: Environment Variable (Recommended)**

```bash
export SPRING_AI_OPENAI_API_KEY=your-api-key-here
```

**Option B: Application Properties**
Add to `application.properties`:

```properties
spring.ai.openai.api-key=your-api-key-here
```

### 3. Run the Application

```bash
cd backend
mvn spring-boot:run
```

## 🎨 AI Image Generation Features

### Enhanced Prompt Generation

The system automatically enhances user prompts with:

- **Trinity College Context**: Campus environment, blue/gold colors
- **Category-Specific Elements**: Technology, health, transportation themes
- **Futuristic Aesthetics**: Clean, modern, optimistic visual style
- **Educational Focus**: Student-friendly, inspiring imagery

### Example Prompt Enhancement

**User Input:**

> "Smart classrooms that adapt to learning styles"

**Enhanced AI Prompt:**

> "A futuristic, optimistic vision of smart classrooms that adapt to learning styles. Collaborative workspaces, AI-assisted learning, interdisciplinary research labs, global connectivity. Set in a futuristic Trinity College campus environment. Clean, modern aesthetic with blue and gold Trinity colors. Students and faculty interacting with advanced technology. Optimistic, educational, and inspiring atmosphere. Style: Digital art, clean lines, bright colors, professional illustration quality, suitable for educational content."

## 📡 API Endpoints

### Generate New Card with AI Image

**POST** `/api/cards/generate`

**Request Body:**

```json
{
  "title": "Smart Learning Pods",
  "description": "Personalized AI tutors that adapt to individual learning styles",
  "submittedBy": "Student Name",
  "category": "WORK"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Smart Learning Pods",
  "description": "Personalized AI tutors that adapt to individual learning styles",
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "submittedBy": "Student Name",
  "submittedAt": "2024-01-15T10:30:00",
  "isFeatured": false,
  "category": "WORK"
}
```

### Generate Images for Existing Cards

**POST** `/api/cards/generate-images`

Generates AI images for all existing cards that don't have images or have placeholder images.

## 🛠️ Configuration Options

### Image Generation Settings

In `application.properties`:

```properties
# AI Image Generation Settings
spring.ai.openai.image.model=dall-e-3
spring.ai.openai.image.options.size=1024x1024
spring.ai.openai.image.options.quality=standard
spring.ai.openai.image.options.n=1
```

### Available Options

- **Model**: `dall-e-3` (recommended) or `dall-e-2`
- **Size**: `1024x1024`, `1792x1024`, or `1024x1792`
- **Quality**: `standard` or `hd` (higher quality, more expensive)
- **Number**: `1` (number of images to generate)

## 🧪 Testing

### Run Tests

```bash
mvn test
```

### Test Profile

The application includes a test profile that uses a mock image service:

```properties
spring.profiles.active=test
```

This allows testing without requiring an actual OpenAI API key.

## 💰 Cost Considerations

### DALL-E 3 Pricing (as of 2024)

- **Standard Quality**: $0.040 per image
- **HD Quality**: $0.080 per image

### Cost Management Tips

1. **Use Standard Quality** for most applications
2. **Implement Caching** to avoid regenerating similar images
3. **Set Rate Limits** to prevent excessive API usage
4. **Monitor Usage** through OpenAI dashboard

## 🔒 Security Best Practices

### API Key Security

1. **Never commit API keys** to version control
2. **Use environment variables** for production
3. **Rotate keys regularly**
4. **Monitor API usage** for unusual activity

### Input Validation

The system validates all user inputs:

- Required fields (title, description, submittedBy)
- Maximum length limits
- Category validation
- XSS protection

## 🚀 Production Deployment

### Environment Setup

1. **Set Production Profile**:

   ```properties
   spring.profiles.active=prod
   ```

2. **Configure Production Database**:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/project2123
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

3. **Set Production API Key**:
   ```bash
   export SPRING_AI_OPENAI_API_KEY=your-production-key
   ```

### Monitoring

- Monitor API usage through OpenAI dashboard
- Set up logging for image generation events
- Implement health checks for AI service availability

## 🐛 Troubleshooting

### Common Issues

**1. API Key Not Found**

```
Error: OpenAI API key is required
```

**Solution**: Set the `SPRING_AI_OPENAI_API_KEY` environment variable

**2. Rate Limit Exceeded**

```
Error: Rate limit exceeded
```

**Solution**: Wait before retrying or implement exponential backoff

**3. Invalid Image Size**

```
Error: Invalid image size
```

**Solution**: Use supported sizes: `1024x1024`, `1792x1024`, or `1024x1792`

### Debug Mode

Enable debug logging:

```properties
logging.level.edu.trincoll.project2123.service=DEBUG
logging.level.org.springframework.ai=DEBUG
```

## 📈 Future Enhancements

### Planned Features

1. **Image Caching**: Store generated images locally
2. **Batch Processing**: Generate multiple images efficiently
3. **Custom Styles**: Allow users to choose image styles
4. **Image Editing**: Basic image manipulation features
5. **Alternative AI Providers**: Support for other image generation services

### Integration Ideas

1. **Content Moderation**: AI-powered content filtering
2. **Image Analysis**: Extract metadata from generated images
3. **User Preferences**: Remember user's preferred image styles
4. **Social Features**: Allow users to rate and comment on images

---

_"The future belongs to those who imagine it."_ - The 2123 Project
