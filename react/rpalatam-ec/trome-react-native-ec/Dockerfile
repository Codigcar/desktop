FROM reactnativecommunity/react-native-android

LABEL Description="This image provides a base Android development with React Native."

# Install other dependencies for ubuntu
RUN apt-get update && apt-get --quiet install -qq -y --no-install-recommends \
    libcurl4-openssl-dev \
    imagemagick

# Install Firebase CLI
RUN yarn global add firebase-tools

# Install Ruby dependencies
COPY Gemfile.lock .
COPY Gemfile .
COPY fastlane/Pluginfile ./fastlane/
RUN bundle install