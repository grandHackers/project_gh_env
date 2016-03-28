FROM yoon01/ubuntu-base:latest

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y nodejs

ADD ~/.ssh/ /root/.ssh
RUN chmod 600 /root/.ssh/*

# Avoid first connection host confirmation
# RUN ssh-keyscan -p2200 github.com > /root/.ssh/known_hosts

RUN mkdir -p /work/project_gh_blog
WORKDIR /work/project_gh_blog

# update NPM to latest
# RUN npm update -g

RUN git clone git@github.com:grandHackers/project_gh_blog.git .
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
