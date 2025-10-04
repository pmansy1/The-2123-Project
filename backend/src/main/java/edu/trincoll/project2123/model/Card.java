package edu.trincoll.project2123.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * Represents a futuristic vision trading card in The 2123 Project.
 * Each card contains a user's vision for the future and associated metadata.
 */
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must not exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(nullable = false, length = 500)
    private String description;

    @Size(max = 200, message = "Image URL must not exceed 200 characters")
    @Column(length = 200)
    private String imageUrl;

    @Column(name = "submitted_by")
    private String submittedBy;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private CardCategory category;

    // Default constructor
    public Card() {
        this.submittedAt = LocalDateTime.now();
    }

    // Constructor with required fields
    public Card(String title, String description, String submittedBy) {
        this();
        this.title = title;
        this.description = description;
        this.submittedBy = submittedBy;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }

    public CardCategory getCategory() {
        return category;
    }

    public void setCategory(CardCategory category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", submittedBy='" + submittedBy + '\'' +
                ", submittedAt=" + submittedAt +
                ", isFeatured=" + isFeatured +
                ", category=" + category +
                '}';
    }
}
