# Backend

This project is built using Rust. Follow the steps below to set up the environment:

1. **Create a `.env` file** in the root directory of the project.
2. **Add your OpenAI API key** to the `.env` file in the following format:
   ```env
   OPENAI_API_KEY=sk-YOUR-KEY-HERE
    ```

3. **Run the application** using Cargo:
   ```bash
   cargo run simple
   ```

The built frontend can be accessed at `/app`.

---

# Frontend

The frontend is developed using Solid.js and features a simple design that leverages Tailwind CSS. It is designed to be served by the backend. Feel free to modify and build your own frontend if you want to selfhost namy.ai for some reason
