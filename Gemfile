source 'https://rubygems.org'
ruby '~> 2.4.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.0.rc1'
gem 'pg', "~> 0.20"
gem 'puma', '~> 3.8'
gem 'sass-rails', github: "rails/sass-rails"

gem 'uglifier', '~> 3.1'
gem 'webpacker', "~> 1.1"

gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5.0'
gem 'jbuilder', '~> 2.6'

group :development, :test do
  gem 'byebug', "~> 9.0", platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver', "~> 3.3"
end

group :development do
  gem 'web-console', '~> 3.4'
  gem 'listen', '~> 3.1', '< 3.2'
  gem 'spring', "~> 2.0"
  gem 'spring-watcher-listen', '~> 2.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
