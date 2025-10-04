package edu.trincoll.project2123.config;

import edu.trincoll.project2123.model.Card;
import edu.trincoll.project2123.model.CardCategory;
import edu.trincoll.project2123.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Data initialization component that populates the database with sample cards
 * when the application starts. This provides the 50 pre-generated cards
 * mentioned in the project requirements.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CardRepository cardRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (cardRepository.count() == 0) {
            initializeSampleCards();
        }
    }

    private void initializeSampleCards() {
        // Sample futuristic vision cards for The 2123 Project

        // Health & Medicine Cards
        createCard("Quantum Learning Pods",
                "Personalized AI tutors that adapt to individual learning styles, making education accessible to everyone regardless of background or ability.",
                "assets/TradingCard.png", "AI System", CardCategory.WORK, true);

        createCard("Neural Interface Libraries",
                "Direct brain-to-information access allowing students to download knowledge instantly while maintaining critical thinking skills.",
                "assets/12.png", "Dr. Sarah Chen", CardCategory.WORK, true);

        createCard("Wellness Integration Centers",
                "Holistic health facilities combining physical, mental, and spiritual wellness with cutting-edge technology.",
                "assets/Health.png", "Health Services", CardCategory.HEALTH, true);

        createCard("Preventive Medicine Labs",
                "Research facilities focused on preventing diseases before they occur through personalized health monitoring.",
                "assets/96.png", "Medical Research", CardCategory.HEALTH, true);

        createCard("Mental Health AI Companions",
                "Intelligent systems that provide 24/7 emotional support and mental health monitoring for students.",
                "assets/Health.png", "Counseling Services", CardCategory.HEALTH, false);

        // Transportation Cards
        createCard("Flying Campus Shuttles",
                "Autonomous aerial vehicles providing quick, eco-friendly transportation across campus and to nearby areas.",
                "assets/Transportation.png", "Transportation Dept", CardCategory.TRANSPORTATION, true);

        createCard("Hyperloop Connection",
                "High-speed underground transportation linking Trinity to major cities in minutes rather than hours.",
                "assets/33.png", "Infrastructure Team", CardCategory.TRANSPORTATION, true);

        createCard("Personal Mobility Pods",
                "Individual transportation units that adapt to user needs, weather, and destination requirements.",
                "assets/Transportation.png", "Innovation Lab", CardCategory.TRANSPORTATION, false);

        createCard("Zero-Emission Campus Fleet",
                "Complete transition to electric and hydrogen-powered vehicles for all campus transportation needs.",
                "assets/33.png", "Sustainability Team", CardCategory.TRANSPORTATION, false);

        // Living & Cities Cards
        createCard("Adaptive Dormitories",
                "Living spaces that reconfigure themselves based on student needs, preferences, and activities.",
                "assets/Living.png", "Residential Life", CardCategory.LIVING, true);

        createCard("Vertical Garden Communities",
                "High-rise student housing integrated with vertical farms providing fresh food and green spaces.",
                "assets/77.png", "Urban Planning", CardCategory.LIVING, true);

        createCard("Smart Home Integration",
                "Dorm rooms that learn student habits and optimize lighting, temperature, and environment automatically.",
                "assets/Living.png", "IoT Innovation", CardCategory.LIVING, false);

        createCard("Carbon-Negative Campus",
                "Trinity becomes a net carbon sink, with buildings that actively remove CO2 from the atmosphere.",
                "assets/Living.png", "Green Trinity", CardCategory.LIVING, true);

        createCard("Living Building Integration",
                "Campus buildings that grow and adapt, incorporating living walls, rooftop forests, and integrated ecosystems.",
                "assets/77.png", "Eco Architecture", CardCategory.LIVING, false);

        createCard("Zero-Waste Learning",
                "Complete circular economy on campus where all materials are reused, recycled, or composted.",
                "assets/Living.png", "Sustainability Team", CardCategory.LIVING, false);

        // Entertainment & Communication Cards
        createCard("Holographic Campus Tours",
                "Immersive virtual reality experiences that let prospective students explore Trinity's campus from anywhere in the world.",
                "assets/Exhibit.png", "Virtual Trinity", CardCategory.COMMUNICATION, true);

        createCard("Thought Broadcasting Network",
                "Ethical telepathic communication system allowing students to share ideas and emotions directly.",
                "assets/12.png", "Communication Studies", CardCategory.COMMUNICATION, true);

        createCard("Immersive News Experiences",
                "News consumption through full sensory experiences that help students understand global events deeply.",
                "assets/Exhibit.png", "Media Studies", CardCategory.COMMUNICATION, false);

        createCard("AI Content Creators",
                "Artificial intelligence systems that help students create multimedia content for their projects.",
                "assets/TradingCard.png", "Digital Arts", CardCategory.COMMUNICATION, false);

        createCard("Virtual Reality Classrooms",
                "Immersive learning environments that transport students to historical events, distant planets, or microscopic worlds.",
                "assets/Exhibit.png", "Educational Technology", CardCategory.COMMUNICATION, false);

        // Work & Education Cards
        createCard("Interdisciplinary Fusion Labs",
                "Spaces where students from different majors collaborate on projects that combine arts, sciences, and humanities.",
                "assets/TradingCard.png", "Trinity Innovation", CardCategory.WORK, true);

        createCard("Global Classroom Network",
                "Real-time collaborative learning spaces connecting Trinity students with peers from universities worldwide.",
                "assets/12.png", "International Relations", CardCategory.WORK, true);

        createCard("Mentorship Time Capsules",
                "AI-powered systems that preserve and share wisdom from alumni across generations.",
                "assets/TradingCard.png", "Alumni Network", CardCategory.WORK, false);

        createCard("Universal Basic Learning",
                "Economic system where all students receive resources to pursue their educational passions without financial stress.",
                "assets/12.png", "Economics Dept", CardCategory.WORK, true);

        createCard("Collaborative Economy Platform",
                "Student-run marketplace where skills, knowledge, and resources are shared rather than sold.",
                "assets/TradingCard.png", "Business School", CardCategory.WORK, false);

        createCard("Purpose-Driven Careers",
                "Career guidance system that matches students with work that aligns with their values and passions.",
                "assets/12.png", "Career Services", CardCategory.WORK, false);

        createCard("Cultural Exchange Pods",
                "Dedicated spaces where students share traditions, languages, and perspectives from their diverse backgrounds.",
                "assets/TradingCard.png", "Diversity Council", CardCategory.WORK, false);

        createCard("Digital Democracy Platform",
                "Student governance system using blockchain technology for transparent, participatory decision-making.",
                "assets/12.png", "Student Government", CardCategory.WORK, false);

        createCard("Intergenerational Learning",
                "Programs connecting current students with elderly community members for mutual learning and wisdom sharing.",
                "assets/TradingCard.png", "Community Outreach", CardCategory.WORK, false);

        // Other Category Cards
        createCard("Time Capsule Museum",
                "Interactive museum showcasing artifacts and stories from Trinity's past, present, and imagined future.",
                "assets/Exhibit.png", "History Dept", CardCategory.OTHER, false);

        createCard("Dream Incubation Labs",
                "Sleep research facilities where students' dreams are analyzed to unlock creative potential.",
                "assets/96.png", "Psychology Dept", CardCategory.OTHER, false);

        createCard("Quantum Art Galleries",
                "Exhibition spaces where art exists in multiple dimensions simultaneously, changing based on viewer perspective.",
                "assets/Exhibit.png", "Art Department", CardCategory.OTHER, false);

        createCard("Memory Palace Libraries",
                "Virtual libraries where students can walk through their own memories and organize knowledge spatially.",
                "assets/TradingCard.png", "Library Sciences", CardCategory.OTHER, false);

        createCard("Consciousness Expansion Centers",
                "Facilities dedicated to exploring altered states of consciousness for enhanced learning and creativity.",
                "assets/96.png", "Neuroscience Dept", CardCategory.OTHER, false);

        System.out.println("Initialized " + cardRepository.count() + " sample cards");
    }

    private void createCard(String title, String description, String imageUrl,
            String submittedBy, CardCategory category, boolean isFeatured) {
        Card card = new Card();
        card.setTitle(title);
        card.setDescription(description);
        card.setImageUrl(imageUrl);
        card.setSubmittedBy(submittedBy);
        card.setCategory(category);
        card.setIsFeatured(isFeatured);
        card.setSubmittedAt(LocalDateTime.now());

        cardRepository.save(card);
    }
}
