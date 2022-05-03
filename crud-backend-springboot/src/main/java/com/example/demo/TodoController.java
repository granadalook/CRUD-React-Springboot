package com.example.demo;
import com.example.demo.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class TodoController {
    @Autowired
    private TodoService service;

    @GetMapping(path = "api/todos")
    public Iterable<Todo> list() {
        return service.list();
    }

    @PostMapping(path = "api/todo")
    public Todo save(@RequestBody Todo todo) {
        return service.save(todo);
    }

    @PutMapping(path = "api/todo")
    public  Todo update(@RequestBody Todo todo){
        if(todo.getId() != 0){
            return service.save(todo);
        }
        throw  new RuntimeException("no existe ");
    }



    @DeleteMapping(path = "api/{id}/todo")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);

    }

    @GetMapping(path = "api/{id}/todo")
    public Todo get(@PathVariable("id") Long id) {
        return service.get(id);

    }
}
