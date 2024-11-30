# ClassBuddy - AI Teaching Assistant Management System

ClassBuddy is a comprehensive web application for managing virtual teaching assistants (TAs) and GPTs in an educational context. It provides an intuitive interface for creating, managing, and interacting with AI-powered teaching assistants.

## Features

- **Virtual TA Management**: Create and manage AI teaching assistants for different courses
- **GPT Integration**: Utilize various GPT models for different educational purposes
- **Dashboard**: Monitor system usage and analytics
- **Chat Interface**: Interact with TAs and GPTs through a user-friendly chat interface
- **File Management**: Upload and manage educational resources and GPT knowledge bases

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: TanStack Query
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage

## Database Structure

### Tables

1. **virtual_tas**
   - Stores information about virtual teaching assistants
   - Fields: course, name, instructor details, configuration settings

2. **gpts**
   - Manages GPT configurations
   - Fields: name, description, category, prompts, settings

3. **gpt_categories**
   - Organizes GPTs into categories
   - Fields: name, description

4. **gpt_files**
   - Stores files associated with GPTs
   - Fields: file information, relationships to GPTs

## Local Development Setup

1. **Prerequisites**
   ```bash
   # Install Node.js and npm (recommended to use nvm)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 16
   nvm use 16
   ```

2. **Clone and Install**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd classbuddy

   # Install dependencies
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Add your Supabase credentials to .env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── integrations/     # Third-party integrations
└── types/            # TypeScript type definitions
```

## Deployment

1. **Local Production Build**
   ```bash
   npm run build
   npm run preview
   ```

2. **Supabase Setup**
   - Create a new Supabase project
   - Run the migration scripts in `supabase/migrations`
   - Configure authentication providers if needed
   - Set up storage buckets for file uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.