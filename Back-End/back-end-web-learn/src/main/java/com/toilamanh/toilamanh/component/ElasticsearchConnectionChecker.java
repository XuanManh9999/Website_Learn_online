package com.toilamanh.toilamanh.component;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

public class ElasticsearchConnectionChecker {
    private final RestHighLevelClient client;


    public ElasticsearchConnectionChecker(RestHighLevelClient client) {
        this.client = client;
    }
    @Bean
    CommandLineRunner checkElasticsearchConnection() {
        return args -> {
            try {
                boolean isConnected = client.ping(null);
                if (isConnected) {
                    System.out.println("Successfully connected to Elasticsearch!");
                } else {
                    System.err.println("Failed to connect to Elasticsearch.");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}
