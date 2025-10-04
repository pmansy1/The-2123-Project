package edu.trincoll.project2123.controller;

import edu.trincoll.project2123.model.Card;
import edu.trincoll.project2123.model.CardCategory;
import edu.trincoll.project2123.repository.CardRepository;
import edu.trincoll.project2123.service.AIImageGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Card operations.
 * Provides API endpoints for managing futuristic vision trading cards.
 */
@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*") // Allow CORS for frontend integration
public class CardController {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private AIImageGenerationService aiImageGenerationService;

    /**
     * GET /api/cards
     * Retrieve all cards
     * 
     * @return List of all cards
     */
    @GetMapping
    public ResponseEntity<List<Card>> getAllCards() {
        List<Card> cards = cardRepository.findAll();
        return ResponseEntity.ok(cards);
    }

    /**
     * GET /api/cards/{id}
     * Retrieve a specific card by ID
     * 
     * @param id The card ID
     * @return The card if found, 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        Optional<Card> card = cardRepository.findById(id);
        return card.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/cards/featured
     * Retrieve all featured cards
     * 
     * @return List of featured cards
     */
    @GetMapping("/featured")
    public ResponseEntity<List<Card>> getFeaturedCards() {
        List<Card> featuredCards = cardRepository.findByIsFeaturedTrue();
        return ResponseEntity.ok(featuredCards);
    }

    /**
     * GET /api/cards/category/{category}
     * Retrieve cards by category
     * 
     * @param category The card category
     * @return List of cards in the specified category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Card>> getCardsByCategory(@PathVariable CardCategory category) {
        List<Card> cards = cardRepository.findByCategory(category);
        return ResponseEntity.ok(cards);
    }

    /**
     * GET /api/cards/random/{limit}
     * Retrieve random cards
     * 
     * @param limit Maximum number of cards to return
     * @return List of random cards
     */
    @GetMapping("/random/{limit}")
    public ResponseEntity<List<Card>> getRandomCards(@PathVariable int limit) {
        List<Card> randomCards = cardRepository.findRandomCards(limit);
        return ResponseEntity.ok(randomCards);
    }

    /**
     * POST /api/cards
     * Create a new card
     * 
     * @param card The card to create
     * @return The created card
     */
    @PostMapping
    public ResponseEntity<Card> createCard(@Valid @RequestBody Card card) {
        Card savedCard = cardRepository.save(card);
        return ResponseEntity.ok(savedCard);
    }

    /**
     * POST /api/cards/generate
     * Generate a new card with AI-generated image from user input
     * 
     * @param request The generation request containing user's vision
     * @return The generated card with AI-generated image
     */
    @PostMapping("/generate")
    public ResponseEntity<Card> generateCard(@RequestBody CardGenerationRequest request) {
        try {
            // Validate required fields
            if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (request.getSubmittedBy() == null || request.getSubmittedBy().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Use AI service to generate card with image
            Card generatedCard = aiImageGenerationService.generateCardWithImage(
                    request.getTitle().trim(),
                    request.getDescription().trim(),
                    request.getSubmittedBy().trim(),
                    request.getCategory() != null ? request.getCategory() : CardCategory.OTHER);

            return ResponseEntity.ok(generatedCard);

        } catch (Exception e) {
            // Log the error (in production, use proper logging)
            System.err.println("Error generating card: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * PUT /api/cards/{id}
     * Update an existing card
     * 
     * @param id   The card ID
     * @param card The updated card data
     * @return The updated card
     */
    @PutMapping("/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable Long id, @Valid @RequestBody Card card) {
        if (!cardRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        card.setId(id);
        Card updatedCard = cardRepository.save(card);
        return ResponseEntity.ok(updatedCard);
    }

    /**
     * POST /api/cards/generate-images
     * Generate AI images for existing cards that don't have them
     * 
     * @return Success message
     */
    @PostMapping("/generate-images")
    public ResponseEntity<String> generateImagesForExistingCards() {
        try {
            aiImageGenerationService.generateImagesForExistingCards();
            return ResponseEntity.ok("Image generation completed successfully");
        } catch (Exception e) {
            System.err.println("Error generating images: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Failed to generate images: " + e.getMessage());
        }
    }

    /**
     * DELETE /api/cards/{id}
     * Delete a card
     * 
     * @param id The card ID
     * @return 204 No Content if successful
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        if (!cardRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        cardRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Inner class for card generation requests
     */
    public static class CardGenerationRequest {
        private String title;
        private String description;
        private String submittedBy;
        private CardCategory category;

        // Getters and Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getSubmittedBy() {
            return submittedBy;
        }

        public void setSubmittedBy(String submittedBy) {
            this.submittedBy = submittedBy;
        }

        public CardCategory getCategory() {
            return category;
        }

        public void setCategory(CardCategory category) {
            this.category = category;
        }
    }
}
