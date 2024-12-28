import { useState } from 'react';
import styles from './TreeConverter.module.css';

// Типы для описания структуры данных
type BoxID = number; // Идентификатор узла
type Node = { id: BoxID; parentId: BoxID }; // Узел в "плоском" формате
type Flat = Node[]; // Список узлов в "плоском" формате
type Box = Node & { child: Box[] }; // Узел с дочерними элементами
type Tree = Box[]; // Дерево — массив корневых узлов с дочерними

const getTree = (a: Flat): Tree => {
  const map = new Map<BoxID, Box>(); // Карта для хранения узлов по их id
  const tree: Tree = []; // Массив для хранения корневых узлов дерева

  // Шаг 1: Создаём карту, где каждый узел изначально не имеет дочерних элементов
  for (const node of a) {
    map.set(node.id, { ...node, child: [] });
  }

  // Шаг 2: Связываем узлы в дерево
  for (const node of a) {
    const current = map.get(node.id)!; // Берём текущий узел из карты
    if (node.parentId === 0) {
      // Если parentId === 0, добавляем узел как корневой
      tree.push(current);
    } else {
      const parent = map.get(node.parentId); // Ищем родительский узел
      if (parent) {
        parent.child.push(current); // Добавляем текущий узел как ребёнка родителя
      }
    }
  }

  return tree; // Возвращаем дерево
};

// Компонент для преобразования JSON-данных в дерево и отображения результата.

const TreeConverter = () => {
  const [input, setInput] = useState(''); // Состояние для входных данных
  const [result, setResult] = useState<Tree | null>(null); // Состояние для результата

  // Обработчик для преобразования входных данных.

  const handleConvert = () => {
    try {
      // Преобразуем входную строку в массив объектов
      const parsed: Node[] = JSON.parse(input);

      if (!parsed || !Array.isArray(parsed)) {
        alert('Invalid format! Please provide a valid JSON array.');
        return;
      }

      // Преобразуем данные в древовидную структуру
      const tree = getTree(parsed);
      setResult(tree); // Сохраняем результат в состоянии
    } catch (error) {
      alert('Invalid JSON format!');
      console.error('Error parsing or processing input:', error);
    }
  };

  return (
    <div className={styles.treeConverter}>
      <h3>Дерево из JSON</h3>
      <div className={styles.inputContainer}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter flat JSON here"
          rows={10}
          cols={30}
        />
        <p>Пример: </p>
        <p className={styles.example}>
          {JSON.stringify([
            { id: 1, parentId: 0 },
            { id: 2, parentId: 1 },
            { id: 3, parentId: 1 },
            { id: 4, parentId: 0 },
            { id: 5, parentId: 4 },
          ])}
        </p>
      </div>
      <button className={styles.convertButton} onClick={handleConvert}>
        Конвертировать
      </button>
      <pre>{result ? JSON.stringify(result, null, 2) : 'Result will appear here'}</pre>
    </div>
  );
};

export default TreeConverter;
