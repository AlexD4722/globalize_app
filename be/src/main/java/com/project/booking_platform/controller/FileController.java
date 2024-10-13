package com.project.booking_platform.controller;

import com.project.booking_platform.service.fileupload.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {
    private final FileStorageService fileService;
    public FileController(FileStorageService fileService) {
        this.fileService = fileService;
    }
    @PostMapping("/picture")
    public String uploadPicture(@RequestParam MultipartFile file) {
        return fileService.storeFile(file, "hello");
    }
    @GetMapping("/property/{id}/{file:.+}")
    public ResponseEntity<Resource> getPropertyFile(@PathVariable String file, @PathVariable String id) {
        String filePath = "property/" + id + "/" + file;
        Resource resource = fileService.loadFileAsResource(filePath);
        String fileType = file.substring(file.lastIndexOf('.') + 1);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/" + fileType)
                .body(resource);
    }
    @GetMapping("/property/{id}/feature/{file:.+}")
    public ResponseEntity<Resource> getPropertyFeaturedFile(@PathVariable String file, @PathVariable String id) {
        String filePath = "property/" + id + "/feature/" + file;
        Resource resource = fileService.loadFileAsResource(filePath);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                .body(resource);
    }
}
