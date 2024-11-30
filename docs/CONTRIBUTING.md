# Contributing to Compliance OS

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account

### Development Setup
1. Clone the repository
```bash
git clone https://github.com/your-org/compliance-os.git
cd compliance-os
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Guidelines
1. Create small, focused components
2. Use TypeScript interfaces for props
3. Implement error boundaries
4. Add proper accessibility attributes
5. Include unit tests

### Git Workflow
1. Create feature branches from `main`
2. Use conventional commits
3. Submit pull requests
4. Request code reviews
5. Squash commits before merging

### Testing
1. Write unit tests for new features
2. Update existing tests when modifying code
3. Ensure all tests pass before submitting PR
4. Add integration tests for API endpoints

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Update changelog
4. Request review from maintainers
5. Address review comments
6. Squash commits
7. Merge after approval

## Release Process

### Version Numbers
- Follow semantic versioning
- Document breaking changes
- Update changelog

### Release Steps
1. Create release branch
2. Update version numbers
3. Generate changelog
4. Create release tag
5. Deploy to staging
6. Test release
7. Deploy to production

## Documentation

### Code Documentation
- Add JSDoc comments
- Document complex logic
- Include usage examples
- Update README.md

### API Documentation
- Document all endpoints
- Include request/response examples
- Note authentication requirements
- List error responses

## Community

### Communication Channels
- GitHub Issues
- Discord server
- Monthly community calls
- Technical blog

### Support
- Stack Overflow tags
- GitHub Discussions
- Documentation
- Community forums

## License
This project is licensed under the MIT License - see the LICENSE file for details.