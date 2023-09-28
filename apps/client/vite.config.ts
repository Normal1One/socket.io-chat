import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	server: {
		port: Number(process.env.VITE_CLIENT_PORT) || 3001
	},
    preview: {
        port: Number(process.env.VITE_CLIENT_PORT) || 3001
    }
})
