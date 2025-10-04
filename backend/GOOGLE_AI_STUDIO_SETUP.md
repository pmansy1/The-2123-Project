# Google AI Studio Setup Guide - The 2123 Project

This guide shows you how to securely set up Google AI Studio for text generation and enhanced descriptions while keeping your API keys out of source code.

## 🔐 Secure API Key Setup

### Method 1: Environment Variables (Recommended)

#### Step 1: Get Your Google AI Studio API Key

1. **Go to Google AI Studio**

   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account

2. **Create API Key**

   - Click on "Get API Key" in the left sidebar
   - Click "Create API Key"
   - Select "Create API key in new project" or choose existing project
   - Copy the API key (starts with `AIza...`)

3. **Set Environment Variables**

**On macOS/Linux:**

```bash
# Add to your ~/.bashrc or ~/.zshrc
export SPRING_AI_GOOGLE_AI_API_KEY="your-api-key-here"

# Reload your shell
source ~/.bashrc  # or source ~/.zshrc
```

**On Windows:**

```cmd
# Set environment variables permanently
setx SPRING_AI_GOOGLE_AI_API_KEY "your-api-key-here"

# Restart your terminal/IDE
```

**For IDE (IntelliJ IDEA/Eclipse):**

1. Go to Run Configuration
2. Add Environment Variables:
   - `SPRING_AI_GOOGLE_AI_API_KEY` = `your-api-key-here`

### Method 2: Application Properties (Development Only)

**Create `application-local.properties` (DO NOT commit this file):**

```properties
# Local development configuration - DO NOT COMMIT TO GIT
spring.ai.google.ai.api-key=your-api-key-here
```

**Add to `.gitignore`:**

```
application-local.properties
```

**Run with local profile:**

```bash
mvn spring-boot:run -Dspring.profiles.active=local
```

## 🎨 How It Works

### Text Enhancement with Google AI Studio

The application uses Google AI Studio to:

1. **Enhance User Prompts**: Takes user's vision description and makes it more detailed and compelling
2. **Generate Rich Descriptions**: Creates enhanced text descriptions for the futuristic visions
3. **Create Placeholder Images**: Generates placeholder images with the enhanced descriptions

### Example Enhancement Process

**User Input:**

> "Smart classrooms that adapt to learning styles"

**Enhanced by Google AI Studio:**

> "Smart classrooms that adapt to learning styles, featuring AI-powered adaptive learning systems, personalized educational pathways, and dynamic content delivery that responds to individual student needs and preferences in real-time."

**Placeholder Image Generated:**

> A placeholder image with the enhanced description as text overlay

## 🚀 Testing Your Setup

### 1. Verify Environment Variables

```bash
echo $SPRING_AI_GOOGLE_AI_API_KEY
```

### 2. Run the Application

```bash
cd backend
mvn spring-boot:run
```

### 3. Test AI Enhancement

```bash
curl -X POST http://localhost:8080/api/cards/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Smart Learning Pods",
    "description": "AI tutors that adapt to individual learning styles",
    "submittedBy": "Test User",
    "category": "WORK"
  }'
```

## 🔧 Configuration Options

### Available Models

```properties
# Text Generation Models
spring.ai.google.ai.image.model=imagen-3.0-generate-001  # For future image generation
spring.ai.google.ai.image.model=gemini-pro              # For text generation

# Generation Settings
spring.ai.google.ai.generation.max-output-tokens=2048
spring.ai.google.ai.generation.temperature=0.7
spring.ai.google.ai.generation.top-p=0.8
spring.ai.google.ai.generation.top-k=40
```

## 🛡️ Security Best Practices

### 1. Never Commit API Keys

```bash
# Add to .gitignore
*.env
application-local.properties
```

### 2. Use Environment Variables in Production

```bash
# Production deployment
export SPRING_AI_GOOGLE_AI_API_KEY="prod-api-key"
```

### 3. Monitor Usage

- Check Google AI Studio dashboard for API usage
- Set up billing alerts if applicable
- Monitor costs regularly

## 💰 Cost Considerations

### Google AI Studio Pricing (as of 2024)

- **Gemini Pro**: Free tier available with usage limits
- **Paid tiers**: Pay-per-use pricing model

### Cost Management Tips

1. **Use Free Tier**: Start with the free tier for development
2. **Monitor Usage**: Keep track of API calls
3. **Implement Caching**: Cache enhanced descriptions to avoid regenerating
4. **Set Rate Limits**: Prevent excessive API usage

## 🔄 Future Image Generation Options

Since Google AI Studio primarily focuses on text generation, here are options for actual image generation:

### Option 1: Google Imagen API (Separate)

- Use Google's Imagen API for actual image generation
- Requires separate setup and billing
- Higher cost but better image quality

### Option 2: Hybrid Approach

- Use Google AI Studio for text enhancement
- Use a different service (DALL-E, Midjourney, etc.) for image generation
- Best of both worlds

### Option 3: Placeholder System (Current)

- Generate enhanced text descriptions
- Create placeholder images with descriptions
- Cost-effective for development and testing

## 🐛 Troubleshooting

### Common Issues

**1. API Key Not Found**

```
Error: Google AI Studio API key is required
```

**Solution**: Set `SPRING_AI_GOOGLE_AI_API_KEY` environment variable

**2. API Key Invalid**

```
Error: Invalid API key
```

**Solution**: Verify your API key is correct and active

**3. Rate Limit Exceeded**

```
Error: Rate limit exceeded
```

**Solution**: Wait before retrying or upgrade your plan

**4. Model Not Available**

```
Error: Model not available
```

**Solution**: Check if the model is available in your region

### Debug Mode

```properties
# Enable debug logging
logging.level.edu.trincoll.project2123.service=DEBUG
logging.level.com.google.ai=DEBUG
```

## 📋 Quick Setup Checklist

- [ ] Google AI Studio account created
- [ ] API key generated
- [ ] Environment variable set
- [ ] Application tested
- [ ] API key added to `.gitignore`
- [ ] Usage monitoring configured

## 🚀 Production Deployment

### Docker Environment Variables

```dockerfile
ENV SPRING_AI_GOOGLE_AI_API_KEY=your-api-key
```

### Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: google-ai-secrets
type: Opaque
data:
  api-key: <base64-encoded-api-key>
```

## 🔮 Next Steps

### Immediate Improvements

1. **Enhanced Text Generation**: Improve prompt engineering for better descriptions
2. **Caching System**: Cache enhanced descriptions to reduce API calls
3. **Error Handling**: Better fallback mechanisms

### Future Enhancements

1. **Image Generation Integration**: Add actual image generation service
2. **Multi-Modal AI**: Use Google's multimodal capabilities
3. **Custom Models**: Train custom models for Trinity-specific content

---

_"The future belongs to those who imagine it."_ - The 2123 Project
