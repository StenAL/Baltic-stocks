package xyz.laane.server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImportingRequest {
    private String isin;
}
