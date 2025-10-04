package edu.trincoll.project2123.repository;

import edu.trincoll.project2123.model.Card;
import edu.trincoll.project2123.model.CardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Card entities.
 * Provides data access methods for managing trading cards.
 */
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    /**
     * Find all featured cards
     * 
     * @return List of featured cards
     */
    List<Card> findByIsFeaturedTrue();

    /**
     * Find cards by category
     * 
     * @param category The category to filter by
     * @return List of cards in the specified category
     */
    List<Card> findByCategory(CardCategory category);

    /**
     * Find cards submitted by a specific user
     * 
     * @param submittedBy The submitter's name
     * @return List of cards submitted by the user
     */
    List<Card> findBySubmittedBy(String submittedBy);

    /**
     * Find cards with titles containing the search term
     * 
     * @param title The search term
     * @return List of cards with matching titles
     */
    List<Card> findByTitleContainingIgnoreCase(String title);

    /**
     * Find cards with descriptions containing the search term
     * 
     * @param description The search term
     * @return List of cards with matching descriptions
     */
    List<Card> findByDescriptionContainingIgnoreCase(String description);

    /**
     * Get random cards for display
     * 
     * @param limit Maximum number of cards to return
     * @return List of random cards
     */
    @Query(value = "SELECT * FROM cards ORDER BY RANDOM() LIMIT ?1", nativeQuery = true)
    List<Card> findRandomCards(int limit);
}
