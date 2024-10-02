mod model; // Declare the model module

#[macro_use]
extern crate rocket;
use std::collections::HashMap;

use dotenv::dotenv;
use rocket::serde::json::Json;

use rocket::fs::FileServer;

#[post("/api/v1/search", format = "application/json", data = "<query>")]
async fn search(query: Json<model::query::Query>) -> Result<Json<HashMap<String, bool>>, String> {
    match query.process().await {
        Ok(result) => Ok(Json(result)),
        Err(e) => Err(e.to_string()), // Convert the error to a string
    }
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    rocket::build()
        .mount("/", FileServer::from("app/")) // Serve static files from 'app/'
        .mount("/", routes![search])
}
