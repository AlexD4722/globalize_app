package com.project.booking_platform.dto.invoice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {
    private String number;
    private String name;
    private String dateCheckIn;
    private String dateCheckOut;
    private String price;
    private int capacity;
}
