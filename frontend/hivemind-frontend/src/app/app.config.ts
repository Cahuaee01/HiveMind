import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './_interceptors/auth.interceptor';

// Application configuration
// Contains providers for the application
  // Contains the routes for the application
  // Contains the interceptors for the application
  // Contains the animations for the application
  // Contains the toastr configuration for the application
  // Contains the HttpClient configuration for the application
  // Contains the markdown configuration for the application

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      progressBar: true,
      newestOnTop: true,
    }),
    provideHttpClient(
      withFetch(), //use the Fetch API instead of XMLHttpRequests
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes),
    provideMarkdown()]
};
