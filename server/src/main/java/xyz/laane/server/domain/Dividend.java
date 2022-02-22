package xyz.laane.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Dividend {
    @Id @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @ToString.Exclude @JsonIgnore
    private Stock stock;

    private LocalDate declaredDate;
    private LocalDate exDiv;
    private LocalDate paid;
    private Double amount;
}
