require 'html/proofer'

# rake serve
desc "serve the site locally"
task :serve do
  sh "bundle exec jekyll serve --watch"
end

# rake test
desc "build and test website"
task :test do
  sh "bundle exec jekyll build"
  sh "scss-lint"
end