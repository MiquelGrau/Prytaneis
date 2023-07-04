import { IWorldMapMarker, IWorldMapNode, IWorldMapPath } from '../models/world-map-settings.model';

export function haversineDistance(marker1: IWorldMapMarker, marker2: IWorldMapMarker): number {
  const R = 6371; // Radi de la Terra en km
  const dLat = degreesToRadians(marker2.latitude - marker1.latitude);
  const dLon = degreesToRadians(marker2.longitude - marker1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(marker1.latitude)) * Math.cos(degreesToRadians(marker2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function degreesToRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

export function dijkstraAlgorithm(startNodeId: string, endNodeId: string, nodes: IWorldMapNode[], paths: IWorldMapPath[]): IWorldMapPath[] {
  const queue: IWorldMapNode[] = [];
  const distances: { [nodeId: string]: number } = {};
  const previousPaths: { [nodeId: string]: IWorldMapPath | null } = {};

  for (const node of nodes) {
    distances[node.id] = node.id === startNodeId ? 0 : Infinity;
    queue.push(node);
    previousPaths[node.id] = null;
  }

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a.id] - distances[b.id]);

    const currentNode = queue.shift();

    if (currentNode && currentNode.id === endNodeId) {
      const path: IWorldMapPath[] = [];
      let previousPath = previousPaths[endNodeId];
      while (previousPath) {
        path.push(previousPath);
        previousPath = previousPaths[previousPath.startNodeId === currentNode.id ? previousPath.endNodeId : previousPath.startNodeId];
      }
      path.reverse();
      return path;
    }

    if (!currentNode || distances[currentNode.id] === Infinity) {
      continue;
    }

    for (const pathObj of paths.filter(path => path.startNodeId === currentNode.id || path.endNodeId === currentNode.id)) {
      const connectedNodeId = pathObj.startNodeId === currentNode.id ? pathObj.endNodeId : pathObj.startNodeId;
      const connectedNode = nodes.find(node => node.id === connectedNodeId);
      if (connectedNode) {
        const distance = distances[currentNode.id] + haversineDistance(currentNode.marker, connectedNode.marker) / pathObj.speed;
        if (distance < distances[connectedNodeId]) {
          distances[connectedNodeId] = distance;
          previousPaths[connectedNodeId] = pathObj;
          queue.push(connectedNode);
        }
      }
    }
  }

  return [];
}
