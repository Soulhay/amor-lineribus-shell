// Async boundary. Module Federation needs this indirection so the shared
// scope is initialised before any remote is imported. Do not inline
// bootstrap.jsx into this file.
import('./bootstrap');