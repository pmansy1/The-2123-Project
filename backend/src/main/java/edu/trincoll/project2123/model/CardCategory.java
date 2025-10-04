package edu.trincoll.project2123.model;

/**
 * Categories for futuristic vision cards in The 2123 Project.
 * These categories help organize and filter visions by theme.
 */
public enum CardCategory {
    HEALTH("Health & Medicine"),
    TRANSPORTATION("Transportation"),
    LIVING("Living & Cities"),
    COMMUNICATION("Entertainment & Communication"),
    WORK("Work & Education"),
    OTHER("Other");

    private final String displayName;

    CardCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
