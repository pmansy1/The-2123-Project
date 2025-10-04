# The 2123 Project - Backend API

This is the Spring Boot backend for The 2123 Project, providing REST API endpoints for managing futuristic vision trading cards.

## 🤖 AI Integration (Google AI Studio)

The application uses Google AI Studio for enhanced text generation and description enhancement. To enable this feature:

### Quick Setup

1. **Get Google AI Studio API Key:**

   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Click "Get API Key" and create a new key

2. **Set Environment Variables:**

   ```bash
   export SPRING_AI_GOOGLE_AI_API_KEY="your-api-key"
   ```

3. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```

### Detailed Setup

See [GOOGLE_AI_STUDIO_SETUP.md](GOOGLE_AI_STUDIO_SETUP.md) for complete setup instructions including:

- Google AI Studio configuration
- Text enhancement features
- Security best practices
- Production deployment
- Troubleshooting

### Test AI Enhancement

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

## 📚 API Endpoints

### Card Management

| Method | Endpoint                         | Description                   |
| ------ | -------------------------------- | ----------------------------- |
| GET    | `/api/cards`                     | Get all cards                 |
| GET    | `/api/cards/{id}`                | Get card by ID                |
| GET    | `/api/cards/featured`            | Get featured cards            |
| GET    | `/api/cards/category/{category}` | Get cards by category         |
| GET    | `/api/cards/random/{limit}`      | Get random cards              |
| POST   | `/api/cards`                     | Create new card               |
| POST   | `/api/cards/generate`            | Generate card from user input |
| PUT    | `/api/cards/{id}`                | Update existing card          |
| DELETE | `/api/cards/{id}`                | Delete card                   |

### Example API Calls

**Get all cards:**

```bash
curl http://localhost:8080/api/cards
```

**Get featured cards:**

```bash
curl http://localhost:8080/api/cards/featured
```

**Create a new card:**

```bash
curl -X POST http://localhost:8080/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Future Vision",
    "description": "A world where education is accessible to all",
    "submittedBy": "Student Name",
    "category": "EDUCATION"
  }'
```

## 🏗️ Project Structure

```
backend/
├── src/main/java/edu/trincoll/project2123/
│   ├── Project2123Application.java          # Main Spring Boot application
│   ├── controller/
│   │   └── CardController.java              # REST API endpoints
│   ├── model/
│   │   ├── Card.java                        # Card entity
│   │   └── CardCategory.java                # Card category enum
│   ├── repository/
│   │   └── CardRepository.java              # Data access layer
│   └── config/
│       └── DataInitializer.java             # Sample data initialization
├── src/main/resources/
│   └── application.properties               # Application configuration
└── pom.xml                                  # Maven dependencies
```

## 🗄️ Database

The application uses H2 in-memory database for development:

- **Database URL**: `jdbc:h2:mem:project2123db`
- **Username**: `sa`
- **Password**: (empty)
- **Console**: `http://localhost:8080/api/h2-console`

### Sample Data

The application automatically initializes with 50 sample futuristic vision cards across different categories:

- **Technology & Innovation**: Quantum learning pods, neural interfaces
- **Education & Learning**: Interdisciplinary labs, global classrooms
- **Environment & Sustainability**: Carbon-negative campus, living buildings
- **Society & Culture**: Cultural exchange pods, digital democracy
- **Health & Medicine**: Wellness centers, preventive medicine
- **Transportation & Mobility**: Flying shuttles, hyperloop connections
- **Living & Architecture**: Adaptive dorms, vertical gardens
- **Communication & Media**: Thought networks, immersive news
- **Work & Economy**: Universal basic learning, collaborative economy

## 🔧 Configuration

Key configuration options in `application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:h2:mem:project2123db
spring.h2.console.enabled=true

# CORS Configuration
spring.web.cors.allowed-origins=*
```

## 🧪 Testing

Run the test suite:

```bash
mvn test
```

The tests verify:

- API endpoint functionality
- Data retrieval operations
- JSON response formatting

## 🔮 Future Enhancements

### Phase 2: AI Integration

- Integrate with AI service for card generation
- Image generation for user-submitted visions
- Content moderation and filtering

### Phase 3: Advanced Features

- User authentication and profiles
- Card rating and voting system
- Advanced search and filtering
- Real-time notifications

### Phase 4: Production Deployment

- PostgreSQL database for production
- Docker containerization
- Cloud deployment (AWS/Azure)
- CI/CD pipeline setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is part of Trinity College's Bicentennial celebration and is intended for educational purposes.

---

_"The future belongs to those who imagine it."_ - The 2123 Project
