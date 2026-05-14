import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

const ServicesPage = lazy(() => import('./pages/services/index'));
const ServiceDetailPage = lazy(() => import('./pages/services/[slug]'));
const BookPage = lazy(() => import('./pages/book'));
const BookingsPage = lazy(() => import('./pages/bookings'));
const AboutPage = lazy(() => import('./pages/about'));
const ContactPage = lazy(() => import('./pages/contact'));
const LoginPage = lazy(() => import('./pages/login'));
const SignupPage = lazy(() => import('./pages/signup'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/services',
        element: <ServicesPage />,
    },
    {
        path: '/services/:slug',
        element: <ServiceDetailPage />,
    },
    {
        path: '/book',
        element: <BookPage />,
    },
    {
        path: '/bookings',
        element: <BookingsPage />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '/contact',
        element: <ContactPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export type Path = '/' | '/services' | '/services/:slug' | '/book' | '/bookings' | '/about' | '/contact';
export type Params = Record<string, string | undefined>;
