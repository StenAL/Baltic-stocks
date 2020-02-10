package ee.borsiinfo.server.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
@Builder
@AllArgsConstructor
public class Dividend {
    private LocalDate declaredDate;
    private LocalDate exDiv;
    private LocalDate paid;
    private Double amount;
}
