package ee.borsiinfo.server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImportingRequest {
    private String isin;
}
