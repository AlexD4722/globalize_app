package com.project.booking_platform.controller;

import com.project.booking_platform.service.fileupload.FileStorageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
