package edu.trincoll.project2123.service;

import edu.trincoll.project2123.model.Card;
import edu.trincoll.project2123.model.CardCategory;
import edu.trincoll.project2123.repository.CardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests for the AI Image Generation Service.
 * These tests verify that the AI service works correctly with the database.
 */
@SpringBootTest
@ActiveProfiles("test")
public class AIImageGenerationServiceTest {

    @Autowired
    private AIImageGenerationService aiImageGenerationService;

    @Autowired
    private CardRepository cardRepository;

    @Test
    public void testGenerateCardWithImage() {
        // Test data
        String title = "Test Vision";
        String description = "A test vision for the future of education";
        String submittedBy = "Test User";
        CardCategory category = CardCategory.WORK;

        // Generate card
        Card generatedCard = aiImageGenerationService.generateCardWithImage(
                title, description, submittedBy, category);

        // Verify card was created
        assertNotNull(generatedCard);
        assertNotNull(generatedCard.getId());
        assertEquals(title, generatedCard.getTitle());
        assertEquals(description, generatedCard.getDescription());
        assertEquals(submittedBy, generatedCard.getSubmittedBy());
        assertEquals(category, generatedCard.getCategory());
        assertNotNull(generatedCard.getImageUrl());
        assertFalse(generatedCard.getIsFeatured());
        assertNotNull(generatedCard.getSubmittedAt());

        // Verify card was saved to database
        assertTrue(cardRepository.existsById(generatedCard.getId()));
    }

    @Test
    public void testGenerateCardWithEmptyTitle() {
        // Test with empty title
        Card generatedCard = aiImageGenerationService.generateCardWithImage(
                "", "Description", "User", CardCategory.OTHER);

        // Should still create a card (fallback behavior)
        assertNotNull(generatedCard);
        assertNotNull(generatedCard.getImageUrl());
    }

    @Test
    public void testGenerateCardWithNullCategory() {
        // Test with null category
        Card generatedCard = aiImageGenerationService.generateCardWithImage(
                "Test Title", "Test Description", "Test User", null);

        // Should still create a card
        assertNotNull(generatedCard);
        assertEquals(CardCategory.OTHER, generatedCard.getCategory());
    }
}
