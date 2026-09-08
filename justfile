##############################
# highball-site dev tasks
#
# The Highball homepage: a Vite + React + Tailwind/DaisyUI static site
# (prerendered) deployed to Fly.io. Run `just` (or `just --list`) to see
# all commands.
##############################

# Show available commands
default:
    just --list


##############################
# Development
##############################

# Install npm dependencies
install:
    npm install

# Start the dev server (http://localhost:5173)
dev:
    npm run dev

# Build the production bundle (client + SSR + prerender) into dist/
build:
    npm run build

# Serve the production build locally (http://localhost:4173)
preview: build
    npm run preview


##############################
# Docker
##############################

# Build the production Docker image
docker-build:
    docker build -t highball-site .

# Run the production image locally (http://localhost:8080)
docker-run: docker-build
    docker run --rm -p 8080:8080 highball-site


##############################
# Deployment
##############################

# Deploy to Fly.io
deploy:
    fly deploy

# Open the deployed site in your browser
open:
    fly apps open

# Tail the production logs
logs:
    fly logs
