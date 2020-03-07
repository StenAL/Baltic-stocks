package ee.borsiinfo.server.rest;

import ee.borsiinfo.server.domain.Index;
import ee.borsiinfo.server.repository.IndexRepository;
import ee.borsiinfo.server.service.importing.IndexDataImportingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/stock")
@RequiredArgsConstructor
public class TestController {

    private final IndexDataImportingService indexDataImportingService;
    private final IndexRepository indexRepository;

    @RequestMapping("/test")
    public Index test() {
        Index index = indexDataImportingService.fetchData("OMXBGI");
        indexRepository.save(index);
        return index;
    }
}
