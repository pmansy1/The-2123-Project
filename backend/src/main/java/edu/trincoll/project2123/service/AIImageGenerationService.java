package edu.trincoll.project2123.service;

import edu.trincoll.project2123.model.Card;
import edu.trincoll.project2123.model.CardCategory;
import edu.trincoll.project2123.repository.CardRepository;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Service class for AI-powered image generation using OpenAI's DALL-E.
 * Generates actual AI images for vision cards.
 */
@Service
public class AIImageGenerationService {

    @Autowired
    private OpenAiImageModel imageModel;

    @Autowired
    private CardRepository cardRepository;

    /**
     * Generate a new card with AI-generated image based on user's vision
     * 
     * @param title       The title of the vision
     * @param description The detailed description of the vision
     * @param submittedBy The name of the person submitting the vision
     * @param category    The category of the vision
     * @return The created card with AI-generated image
     */
    public Card generateCardWithImage(String title, String description, String submittedBy, CardCategory category) {
        try {
            // Create enhanced prompt for image generation
            String imagePrompt = createImagePrompt(title, description, category);

            // Generate AI image
            String imageUrl = generateImage(imagePrompt);

            // Create and save the card
            Card card = new Card();
            card.setTitle(title);
            card.setDescription(description);
            card.setImageUrl(imageUrl);
            card.setSubmittedBy(submittedBy);
            card.setCategory(category);
            card.setIsFeatured(false); // New user-generated cards are not featured by default
            card.setSubmittedAt(LocalDateTime.now());

            return cardRepository.save(card);

        } catch (Exception e) {
            System.err.println("Error generating AI image: " + e.getMessage());
            // Fallback: create card with placeholder image
            return createFallbackCard(title, description, submittedBy, category);
        }
    }

    /**
     * Create a comprehensive prompt for AI image generation
     */
    private String createImagePrompt(String title, String description, CardCategory category) {
        StringBuilder prompt = new StringBuilder();

        // Base context
        prompt.append("A futuristic vision of ");
        prompt.append(title).append(". ");

        // Category-specific context
        switch (category) {
            case HEALTH:
                prompt.append("Healthcare technology, medical innovation, wellness centers, ");
                prompt.append("advanced medical equipment, healthy lifestyle integration. ");
                break;
            case TRANSPORTATION:
                prompt.append("Future transportation, autonomous vehicles, flying cars, ");
                prompt.append("high-speed transit, eco-friendly mobility solutions. ");
                break;
            case LIVING:
                prompt.append("Smart living spaces, sustainable architecture, ");
                prompt.append("adaptive environments, eco-friendly housing. ");
                break;
            case COMMUNICATION:
                prompt.append("Advanced communication technology, holographic displays, ");
                prompt.append("virtual reality interfaces, global connectivity. ");
                break;
            case WORK:
                prompt.append("Future of work, collaborative spaces, AI-assisted productivity, ");
                prompt.append("remote work technology, innovative office environments. ");
                break;
            case OTHER:
                prompt.append("Innovative technology, creative solutions, ");
                prompt.append("cutting-edge research facilities. ");
                break;
        }

        // Add Trinity College context
        prompt.append("Set in a futuristic Trinity College campus environment. ");
        prompt.append("Clean, modern aesthetic with blue and gold Trinity colors. ");
        prompt.append("Students and faculty interacting with advanced technology. ");
        prompt.append("Optimistic, educational, and inspiring atmosphere. ");

        // Add description details
        prompt.append("Specific elements: ");
        prompt.append(description);

        // Style guidelines
        prompt.append(" Style: Digital art, clean lines, bright colors, ");
        prompt.append("professional illustration quality, suitable for educational content. ");
        prompt.append("High resolution, detailed, photorealistic where appropriate.");

        return prompt.toString();
    }

    /**
     * Generate image using OpenAI's DALL-E
     */
    private String generateImage(String prompt) {
        try {
            System.out.println("🎨 Generating AI image with prompt: "
                    + prompt.substring(0, Math.min(100, prompt.length())) + "...");

            // Create image prompt
            ImagePrompt imagePrompt = new ImagePrompt(prompt);

            // Generate image
            ImageResponse response = imageModel.call(imagePrompt);

            if (response.getResults() != null && !response.getResults().isEmpty()) {
                String imageUrl = response.getResults().get(0).getOutput().getUrl();
                System.out.println("✅ AI image generated successfully: " + imageUrl);
                return imageUrl;
            } else {
                throw new RuntimeException("No image generated");
            }

        } catch (Exception e) {
            System.err.println("❌ Error generating AI image: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Create a fallback card if AI generation fails
     */
    private Card createFallbackCard(String title, String description, String submittedBy, CardCategory category) {
        Card card = new Card();
        card.setTitle(title);
        card.setDescription(description);
        // Use a better placeholder service that generates images based on text
        card.setImageUrl(createBetterPlaceholderImageUrl(title, description, category));
        card.setSubmittedBy(submittedBy);
        card.setCategory(category);
        card.setIsFeatured(false);
        card.setSubmittedAt(LocalDateTime.now());

        System.out.println("⚠️ Using enhanced placeholder due to AI generation failure");
        return cardRepository.save(card);
    }

    /**
     * Create a better placeholder image URL using a free service
     */
    private String createBetterPlaceholderImageUrl(String title, String description, CardCategory category) {
        try {
            // Use picsum.photos with category-specific parameters
            String categoryColor = getCategoryColor(category);
            String text = title.replaceAll("\\s+", "+");

            // Use a service that can generate images with text
            return String.format("https://picsum.photos/400/300?random=%d",
                    Math.abs((title + description).hashCode()));

        } catch (Exception e) {
            return "assets/placeholder.png";
        }
    }

    /**
     * Get color code for category
     */
    private String getCategoryColor(CardCategory category) {
        switch (category) {
            case HEALTH:
                return "00ff00";
            case TRANSPORTATION:
                return "0066cc";
            case LIVING:
                return "ff6600";
            case COMMUNICATION:
                return "ff00ff";
            case WORK:
                return "ffff00";
            case OTHER:
                return "ff0000";
            default:
                return "666666";
        }
    }

    /**
     * Generate images for existing cards that don't have AI-generated images
     */
    public void generateImagesForExistingCards() {
        System.out.println("🔄 Generating AI images for existing cards...");

        // Find cards that still have placeholder images
        var cards = cardRepository.findAll();
        int generatedCount = 0;

        for (Card card : cards) {
            if (card.getImageUrl() != null &&
                    (card.getImageUrl().contains("placeholder") ||
                            card.getImageUrl().contains("assets/"))) {

                try {
                    String imagePrompt = createImagePrompt(card.getTitle(), card.getDescription(), card.getCategory());
                    String imageUrl = generateImage(imagePrompt);
                    card.setImageUrl(imageUrl);
                    cardRepository.save(card);
                    generatedCount++;

                    // Add small delay to avoid rate limiting
                    Thread.sleep(1000);

                } catch (Exception e) {
                    System.err
                            .println("Failed to generate image for card: " + card.getTitle() + " - " + e.getMessage());
                }
            }
        }

        System.out.println("✅ Generated " + generatedCount + " AI images for existing cards");
    }
}