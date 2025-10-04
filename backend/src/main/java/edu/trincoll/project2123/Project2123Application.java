package edu.trincoll.project2123;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The 2123 Project - Trinity College Bicentennial Vision Platform
 * 
 * This Spring Boot application provides REST API endpoints for:
 * - Managing AI-generated trading cards
 * - Processing user-submitted futuristic visions
 * - Serving card data to the frontend
 * 
 * @author Trinity College Computer Science Department
 * @version 1.0.0
 */
@SpringBootApplication
public class Project2123Application {

    public static void main(String[] args) {
        SpringApplication.run(Project2123Application.class, args);
    }

}
