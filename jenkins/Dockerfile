FROM jenkins/jenkins:lts-jdk21

USER root

# ==========================================
# Basic packages
# ==========================================

RUN apt-get update \
    && apt-get install -y \
        curl \
        unzip \
        ca-certificates \
        git \
        procps \
        iputils-ping \
        net-tools \
    && rm -rf /var/lib/apt/lists/*


# ==========================================
# Node.js 22
# ==========================================

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && node --version \
    && npm --version


# ==========================================
# Bun
# ==========================================

RUN curl -fsSL https://bun.sh/install | bash \
    && cp -R /root/.bun /opt/bun \
    && chmod -R a+rx /opt/bun

ENV BUN_INSTALL=/opt/bun
ENV PATH=/opt/bun/bin:$PATH


# ==========================================
# Docker CLI
# ==========================================

RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg \
       -o /etc/apt/keyrings/docker.asc \
    && chmod a+r /etc/apt/keyrings/docker.asc \
    && echo \
       "deb [arch=$(dpkg --print-architecture) \
       signed-by=/etc/apt/keyrings/docker.asc] \
       https://download.docker.com/linux/debian \
       $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
       > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce-cli docker-compose-plugin \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# ==========================================
# Verify
# ==========================================

RUN node --version
RUN npm --version
RUN bun --version
RUN docker --version
RUN docker compose version


# ==========================================
# Jenkins user
# ==========================================

RUN chown -R jenkins:jenkins /opt/bun

USER jenkins