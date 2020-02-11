package ee.borsiinfo.server.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Dividend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Stock stock;

    private LocalDate declaredDate;
    private LocalDate exDiv;
    private LocalDate paid;
    private Double amount;
}
