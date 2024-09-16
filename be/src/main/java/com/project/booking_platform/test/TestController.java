package com.project.booking_platform.test;

import com.project.booking_platform.dto.property.PropertyDetailDTO;
import com.project.booking_platform.service.database.PropertyService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/test")
public class TestController {

    private final PropertyService pdservice;
    private final ModelMapper mapper;

    public TestController(PropertyService pdservice, ModelMapper mapper) {
        this.pdservice = pdservice;
        this.mapper = mapper;
    }

    @GetMapping
    public PropertyDetailDTO test() {
        return pdservice.getPropertyDetail("2b3c4d5e6f7g");
    }

}
