package ee.borsiinfo.server.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticker;
    private String name;
    private String isin;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private List<FinancialData> financialData;
    @OneToOne(cascade = CascadeType.ALL)
    private KeyStats keyStats;
    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private List<Dividend> dividends;
}
