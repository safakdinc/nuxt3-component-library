<template>
  <ClientOnly>
    <Gallery
      :card-data="cardData"
      :options="{
        gridRows: 4,
        gridCols: 4,
        tileSize: 2.4,
        baseCameraZ: 10,
        enablePostProcessing: true
      }" />
  </ClientOnly>
</template>

<script setup lang="ts">
import type { CardData } from '@/utils/InfiniteGridClass';

const cardData = [
  {
    title: 'Project Alpha',
    badge: 'New',
    image: '/photos/1.webp',
    description: 'Revolutionary AI-powered analytics platform for enterprise solutions',
    tags: ['AI', 'Analytics', 'SaaS'],
    date: '2024'
  },
  {
    title: 'Design System',
    badge: 'Updated',
    description: 'Comprehensive component library with modern UI patterns',
    image: '/photos/2.webp',
    tags: ['Design', 'UI/UX', 'React'],
    date: '2024'
  },
  {
    title: 'Mobile App',
    badge: 'Beta',
    image: '/photos/3.webp',
    description: 'Cross-platform mobile application with native performance',
    tags: ['Mobile', 'React Native'],
    date: '2024'
  },
  {
    title: 'API Gateway',
    badge: 'Stable',
    image: '/photos/4.webp',
    description: 'High-performance API management and routing system',
    tags: ['Backend', 'API', 'Node.js'],
    date: '2024'
  },
  {
    title: 'Dashboard',
    badge: 'Live',
    image: '/photos/5.webp',
    description: 'Real-time monitoring dashboard with advanced analytics',
    tags: ['Frontend', 'Vue.js', 'Charts'],
    date: '2024'
  },
  {
    title: 'Database',
    badge: 'Optimized',
    image: '/photos/6.webp',
    description: 'Scalable database architecture with improved performance',
    tags: ['Database', 'PostgreSQL'],
    date: '2024'
  },
  {
    title: 'Security',
    badge: 'Critical',
    image: '/photos/7.webp',
    description: 'Enhanced security framework with multi-factor auth',
    tags: ['Security', 'Auth', 'JWT'],
    date: '2023'
  },
  {
    title: 'DevOps',
    badge: 'Automated',
    image: '/photos/8.webp',
    description: 'CI/CD pipeline implementation with Docker containers',
    tags: ['DevOps', 'Docker', 'K8s'],
    date: '2023'
  },
  {
    title: 'Testing',
    badge: 'Complete',
    image: '/photos/9.webp',
    description: 'Comprehensive testing suite with automated coverage',
    tags: ['Testing', 'Jest', 'Cypress'],
    date: '2023'
  },
  {
    title: 'Project Alpha',
    badge: 'New',
    image: '/photos/10.webp',
    description: 'Revolutionary AI-powered analytics platform for enterprise solutions',
    tags: ['AI', 'Analytics', 'SaaS'],
    date: '2024'
  },
  {
    title: 'Design System',
    badge: 'Updated',
    image: '/photos/11.webp',
    description: 'Comprehensive component library with modern UI patterns',
    tags: ['Design', 'UI/UX', 'React'],
    date: '2024'
  },
  {
    title: 'Mobile App',
    badge: 'Beta',
    image: '/photos/12.webp',
    description: 'Cross-platform mobile application with native performance',
    tags: ['Mobile', 'React Native'],
    date: '2024'
  },
  {
    title: 'API Gateway',
    badge: 'Stable',
    image: '/photos/13.webp',
    description: 'High-performance API management and routing system',
    tags: ['Backend', 'API', 'Node.js'],
    date: '2024'
  },
  {
    title: 'Dashboard',
    badge: 'Live',
    image: '/photos/14.webp',
    description: 'Real-time monitoring dashboard with advanced analytics',
    tags: ['Frontend', 'Vue.js', 'Charts'],
    date: '2024'
  },
  {
    title: 'Database',
    badge: 'Optimized',
    image: '/photos/15.webp',
    description: 'Scalable database architecture with improved performance',
    tags: ['Database', 'PostgreSQL'],
    date: '2024'
  },
  {
    title: 'Security',
    badge: 'Critical',
    image: '/photos/16.webp',
    description: 'Enhanced security framework with multi-factor auth',
    tags: ['Security', 'Auth', 'JWT'],
    date: '2023'
  },
  {
    title: 'DevOps',
    badge: 'Automated',
    image: '/photos/8.webp',
    description: 'CI/CD pipeline implementation with Docker containers',
    tags: ['DevOps', 'Docker', 'K8s'],
    date: '2023'
  },
  {
    title: 'Testing',
    badge: 'Complete',
    image: '/photos/15.webp',
    description: 'Comprehensive testing suite with automated coverage',
    tags: ['Testing', 'Jest', 'Cypress'],
    date: '2023'
  }
];
</script>
