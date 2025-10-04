# Google Gemini AI Setup Guide - The 2123 Project

This guide shows you how to securely set up Google Gemini AI for image generation while keeping your API keys out of source code.

## 🔐 Secure API Key Setup

### Method 1: Environment Variables (Recommended)

#### Step 1: Get Your Google Cloud Credentials

1. **Go to Google Cloud Console**

   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**

   - Click on the project dropdown at the top
   - Create a new project or select an existing one
   - Note your Project ID (you'll need this)

3. **Enable Vertex AI API**

   - Go to "APIs & Services" > "Library"
   - Search for "Vertex AI API"
   - Click "Enable"

4. **Create Service Account**

   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name: `gemini-api-service`
   - Description: `Service account for Gemini AI image generation`
   - Click "Create and Continue"

5. **Assign Roles**

   - Add these roles to your service account:
     - `Vertex AI User`
     - `AI Platform Developer`
   - Click "Continue" then "Done"

6. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key (starts with `AIza...`)
   - Click "Restrict Key" and select "Vertex AI API"

#### Step 2: Set Environment Variables

**On macOS/Linux:**

```bash
# Add to your ~/.bashrc or ~/.zshrc
export SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID="your-project-id"
export SPRING_AI_VERTEXAI_GEMINI_API_KEY="your-api-key-here"
export SPRING_AI_VERTEXAI_GEMINI_LOCATION="us-central1"

# Reload your shell
source ~/.bashrc  # or source ~/.zshrc
```

**On Windows:**

```cmd
# Set environment variables permanently
setx SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID "your-project-id"
setx SPRING_AI_VERTEXAI_GEMINI_API_KEY "your-api-key-here"
setx SPRING_AI_VERTEXAI_GEMINI_LOCATION "us-central1"

# Restart your terminal/IDE
```

**For IDE (IntelliJ IDEA/Eclipse):**

1. Go to Run Configuration
2. Add Environment Variables:
   - `SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID` = `your-project-id`
   - `SPRING_AI_VERTEXAI_GEMINI_API_KEY` = `your-api-key-here`
   - `SPRING_AI_VERTEXAI_GEMINI_LOCATION` = `us-central1`

### Method 2: Application Properties (Development Only)

**Create `application-local.properties` (DO NOT commit this file):**

```properties
# Local development configuration - DO NOT COMMIT TO GIT
spring.ai.vertexai.gemini.project-id=your-project-id
spring.ai.vertexai.gemini.api-key=your-api-key-here
spring.ai.vertexai.gemini.location=us-central1
```

**Add to `.gitignore`:**

```
application-local.properties
```

**Run with local profile:**

```bash
mvn spring-boot:run -Dspring.profiles.active=local
```

### Method 3: Google Cloud Service Account (Production)

For production deployment, use Google Cloud service account authentication:

1. **Download Service Account Key**

   - Go to your service account in Google Cloud Console
   - Click "Keys" tab
   - Click "Add Key" > "Create new key" > "JSON"
   - Download the JSON file

2. **Set Environment Variable**

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
   ```

3. **Update Configuration**
   ```properties
   # Remove API key, use service account instead
   spring.ai.vertexai.gemini.project-id=your-project-id
   spring.ai.vertexai.gemini.location=us-central1
   ```

## 🚀 Testing Your Setup

### 1. Verify Environment Variables

```bash
echo $SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID
echo $SPRING_AI_VERTEXAI_GEMINI_API_KEY
echo $SPRING_AI_VERTEXAI_GEMINI_LOCATION
```

### 2. Run the Application

```bash
cd backend
mvn spring-boot:run
```

### 3. Test AI Generation

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

### Available Gemini Models

```properties
# Image Generation Models
spring.ai.vertexai.gemini.image.model=imagen-3.0-generate-001  # Latest
spring.ai.vertexai.gemini.image.model=imagen-2.0-generate-001  # Previous version

# Image Sizes
spring.ai.vertexai.gemini.image.options.size=1024x1024
spring.ai.vertexai.gemini.image.options.size=512x512
spring.ai.vertexai.gemini.image.options.size=256x256

# Image Quality
spring.ai.vertexai.gemini.image.options.quality=standard
spring.ai.vertexai.gemini.image.options.quality=high

# Number of Images
spring.ai.vertexai.gemini.image.options.n=1
```

### Regional Settings

```properties
# Available regions
spring.ai.vertexai.gemini.location=us-central1    # Iowa, USA
spring.ai.vertexai.gemini.location=us-east1      # South Carolina, USA
spring.ai.vertexai.gemini.location=europe-west1   # Belgium
spring.ai.vertexai.gemini.location=asia-southeast1 # Singapore
```

## 🛡️ Security Best Practices

### 1. Never Commit API Keys

```bash
# Add to .gitignore
*.env
application-local.properties
service-account-*.json
```

### 2. Use Environment Variables in Production

```bash
# Production deployment
export SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID="prod-project-id"
export SPRING_AI_VERTEXAI_GEMINI_API_KEY="prod-api-key"
```

### 3. Restrict API Key Permissions

- Only enable "Vertex AI API" for your API key
- Set IP restrictions if possible
- Use service accounts for production

### 4. Monitor Usage

- Check Google Cloud Console for API usage
- Set up billing alerts
- Monitor costs regularly

## 💰 Cost Management

### Gemini Pricing (as of 2024)

- **Imagen 3.0**: $0.02 per image (1024x1024)
- **Imagen 2.0**: $0.015 per image (1024x1024)

### Cost Optimization Tips

1. **Use appropriate image sizes** (512x512 for thumbnails)
2. **Implement caching** to avoid regenerating similar images
3. **Set rate limits** to prevent excessive usage
4. **Monitor usage** through Google Cloud Console

## 🐛 Troubleshooting

### Common Issues

**1. Project ID Not Found**

```
Error: Google Cloud Project ID is required
```

**Solution**: Set `SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID` environment variable

**2. API Key Invalid**

```
Error: Invalid API key
```

**Solution**: Verify your API key is correct and has Vertex AI API enabled

**3. Location Not Supported**

```
Error: Location not supported
```

**Solution**: Use supported regions like `us-central1`, `us-east1`, `europe-west1`

**4. Quota Exceeded**

```
Error: Quota exceeded
```

**Solution**: Check your Google Cloud quotas and billing

### Debug Mode

```properties
# Enable debug logging
logging.level.edu.trincoll.project2123.service=DEBUG
logging.level.org.springframework.ai=DEBUG
logging.level.com.google.cloud=DEBUG
```

## 📋 Quick Setup Checklist

- [ ] Google Cloud Project created
- [ ] Vertex AI API enabled
- [ ] Service account created with proper roles
- [ ] API key generated and restricted
- [ ] Environment variables set
- [ ] Application tested
- [ ] API key added to `.gitignore`
- [ ] Billing alerts configured

## 🚀 Production Deployment

### Docker Environment Variables

```dockerfile
ENV SPRING_AI_VERTEXAI_GEMINI_PROJECT_ID=your-project-id
ENV SPRING_AI_VERTEXAI_GEMINI_API_KEY=your-api-key
ENV SPRING_AI_VERTEXAI_GEMINI_LOCATION=us-central1
```

### Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gemini-secrets
type: Opaque
data:
  project-id: <base64-encoded-project-id>
  api-key: <base64-encoded-api-key>
```

---

_"The future belongs to those who imagine it."_ - The 2123 Project
