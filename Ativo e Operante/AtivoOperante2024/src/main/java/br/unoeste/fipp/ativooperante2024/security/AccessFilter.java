package br.unoeste.fipp.ativooperante2024.security;

import java.io.IOException;


import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AccessFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization");


        if(token != null && token.startsWith("Bearer ")) {

            token = token.substring(7);
            System.out.println("Token de verificação: " + token);

            if(JWTTokenProvider.verifyToken(token)) {
                chain.doFilter(request,response);

//                Claims claims = JWTTokenProvider.getAllClaimsFromToken(token);
//                String nivel = claims.get("nivel", String.class);
//                if(nivel != null && nivel.equals("2")) {
//                    chain.doFilter(request, response);
//                } else {
//                    ((HttpServletResponse)response).setStatus(403);
//                    response.getOutputStream().write("Access denied".getBytes());
//                }
            } else {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                httpResponse.getWriter().write("Acesso não autorizado");
//            ((HttpServletResponse)response).setStatus(401);
//            response.getOutputStream().write("Unauthorized".getBytes());
            }
        } else {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.getWriter().write("Acesso não autorizado");
        }
    }
}