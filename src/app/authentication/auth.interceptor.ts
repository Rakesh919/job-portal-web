import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); 
  console.log('authInterceptor started ')

  if (!req.url.includes('/login') && !req.url.includes('/signup')) {
    // Clone the request to add the Authorization header
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
    console.log('inside if block ')
    console.log(clonedReq)
    return next(clonedReq); // Pass the modified request to the next handler
  }

  return next(req); // Pass the original request if it's login or signup
};
