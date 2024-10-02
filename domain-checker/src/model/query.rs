use reqwest::Client;
use serde::Deserialize;
use serde_json::json;
use std::collections::HashMap;
use std::error::Error;
use whois_rust::{WhoIs, WhoIsLookupOptions}; // Ensure the import is correct

#[derive(Deserialize)]
pub struct Query {
    query: String,
}

impl Query {
    async fn check_domain(
        &self,
        domains: &[&str],
    ) -> Result<HashMap<String, bool>, Box<dyn Error>> {
        let whois = WhoIs::from_path("./servers.json")?;
        let mut availability_map = HashMap::new();

        for &domain in domains {
            match WhoIsLookupOptions::from_string(domain) {
                Ok(options) => {
                    let result = whois
                        .lookup(options)
                        .map_err(|e| format!("WHOIS lookup failed for {}: {}", domain, e))?;
                    if !result.contains("The queried object does not exist:") {
                        availability_map.insert(domain.to_string(), false);
                        println!("{}", result);
                    } else {
                        availability_map.insert(domain.to_string(), true);
                    }
                }
                Err(e) => {
                    return Err(format!("Failed to parse domain '{}': {}", domain, e).into());
                }
            }
        }
        Ok(availability_map)
    }

    pub async fn process(&self) -> Result<HashMap<String, bool>, Box<dyn Error>> {
        let client = Client::new();
        let payload = json!({
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an AI assistant tasked with generating exactly 25 unique, modern domain names. Use the user's input as inspiration for the style, theme, or keywords, but ensure the domains are likely available and suitable for a wide range of purposes. Respond with the domain names in a single line, formatted as a comma-separated list, like this: domain.com,domain.to,example.uk. No additional text, just the domain names."
                },
                {
                    "role": "user",
                    "content": self.query
                }
            ]
        });

        let api_key = std::env::var("OPENAI_API_KEY").expect("OPENAI API KEY REQUIRED");

        // Send the request to OpenAI's API
        let response = client
            .post("https://api.openai.com/v1/chat/completions")
            .header("Authorization", format!("Bearer {}", api_key))
            .json(&payload)
            .send()
            .await?;

        // Check if the response was successful
        if response.status().is_success() {
            let response_json: ApiResponse = response.json().await?;

            let domains: Vec<&str> = response_json.choices[0]
                .message
                .content
                .split(',')
                .map(str::trim) // Trim whitespace i didn't see them in the response
                .collect();

            match self.check_domain(&domains).await {
                Ok(hashmap) => Ok(hashmap),
                Err(e) => Err(format!("Error checking domains: {}", e).into()),
            }
        } else {
            Err(format!("Error: {}", response.status()).into())
        }
    }
}

// Boring Response Structure
#[derive(Deserialize)]
struct ApiResponse {
    choices: Vec<Choice>,
}

#[derive(Deserialize)]
struct Choice {
    message: Message,
}

#[derive(Deserialize)]
struct Message {
    content: String,
}
